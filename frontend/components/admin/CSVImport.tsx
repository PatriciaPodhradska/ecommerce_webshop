'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import axiosClient from '@/lib/axios';
import { toast } from 'sonner';
import Papa from 'papaparse';

interface CSVRow {
    [key: string]: string | number;
}

interface CSVImportProps {
    onSuccess?: () => void;
}

export function CSVImport({ onSuccess }: CSVImportProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results: Papa.ParseResult<CSVRow>) => {
                // Validate that we have data
                if (!results.data || results.data.length === 0) {
                    toast.error('CSV file is empty');
                    return;
                }

                // Expected columns: name, sku, price, stock, category, description
                const firstRow = results.data[0];
                const requiredColumns = ['name', 'sku', 'price', 'stock', 'category'];
                const missingColumns = requiredColumns.filter(col => !(col in firstRow));
                
                if (missingColumns.length > 0) {
                    toast.error(`Missing columns: ${missingColumns.join(', ')}`);
                    return;
                }

                try {
                    setUploading(true);
                    
                    // Transform CSV data to match API expected format
                    const products = results.data.map((row: CSVRow) => ({
                        name: row.name,
                        sku: row.sku,
                        price: parseFloat(row.price as string),
                        stock: parseInt(row.stock as string, 10),
                        description: row.description || '',
                        category: row.category, // category name, we'll need to resolve ID
                    }));

                    // For simplicity, we'll send one by one or bulk (if you have bulk endpoint)
                    // Here we send sequentially to avoid overwhelming the API
                    let successCount = 0;
                    let errorCount = 0;

                    for (const product of products) {
                        try {
                            // First try to get or create category by name
                            let categoryId: number;
                            try {
                                const categoriesRes = await axiosClient.get('/products/categories/');
                                const existingCategory = categoriesRes.data.find(
                                    (cat: { id: number, name: string }) => String(cat.name).toLowerCase() === String(product.category).toLowerCase()
                                );
                                if (existingCategory) {
                                    categoryId = existingCategory.id;
                                } else {
                                    // Create new category
                                    const newCatRes = await axiosClient.post('/products/categories/', {
                                        name: String(product.category),
                                        slug: String(product.category).toLowerCase().replace(/ /g, '-'),
                                    });
                                    categoryId = newCatRes.data.id;
                                }
                            } catch (err) {
                                console.error('Category error:', err);
                                continue;
                            }

                            await axiosClient.post('/products/products/', {
                                name: product.name,
                                sku: product.sku,
                                price: product.price,
                                stock: product.stock,
                                description: product.description,
                                category: categoryId,
                            });
                            successCount++;
                        } catch (err) {
                            errorCount++;
                            console.error(`Failed to import product ${product.name}:`, err);
                        }
                    }

                    toast.success(`Import complete: ${successCount} products added, ${errorCount} failed`);
                    if (onSuccess) onSuccess();
                    
                    // Reset file input
                    e.target.value = '';
                } catch (error) {
                    console.error('Import error:', error);
                    toast.error('Failed to process CSV file');
                } finally {
                    setUploading(false);
                }
            },
            error: (error: Error) => {
                console.error('CSV parsing error:', error);
                toast.error('Failed to parse CSV file');
                setUploading(false);
            },
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Import Products from CSV</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Upload CSV File</h3>
                    <p className="mt-1 text-xs text-gray-500">
                        CSV must have columns: name, sku, price, stock, category, description (optional)
                    </p>
                    <div className="mt-4">
                        <label
                            htmlFor="csv-upload"
                            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Choose CSV File'}
                            <input
                                id="csv-upload"
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}