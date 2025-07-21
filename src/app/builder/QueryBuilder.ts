import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], {}>; // this is mongoose query
    public query: Record<string, unknown>; // This is req.query
    constructor(modelQuery: Query<T[], {}>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" } // i for case-insensitive
                }) as FilterQuery<T>)
            }) as Query<T[], {}, {}, unknown, "find", Record<string, never>>;
        }
        return this;
    }
    filter(filterableFields: Record<string, string>) {
        const queryCopy = { ...this.query };
        Object.keys(queryCopy).forEach((key) => {
            if (key in filterableFields) {
                const value = queryCopy[key];
                if (value) {
                    this.modelQuery = this.modelQuery.find({
                        [filterableFields[key]]: value
                    }) as Query<T[], {}, {}, unknown, "find", Record<string, never>>;
                }
                delete queryCopy[key];
            }
        });
        return this;
    }
}