"use client";

import {
    QueryClient,
    QueryClientProvider
    
} from '@tanstack/react-query'
import { ReactNode } from 'react';

const quesryClient = new QueryClient();

const TanStackProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={quesryClient}>
            {children}
        </QueryClientProvider>
    )
}



export default TanStackProvider;