export type Category = {
    id: string,
    category: string
}

export type Expense = {
    id: string,
    categoryId: string,
    amount: number,
    description?: string,
    createdAt: string,
}