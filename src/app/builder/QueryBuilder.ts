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
    filter() {
        const queryCopy = { ...this.query };
        const excludedFields = ["searchTerm", "page", "limit"];
        excludedFields.forEach((field) => delete queryCopy[field]);
        this.modelQuery = this.modelQuery.find(queryCopy) as Query<T[], {}, {}, unknown, "find", Record<string, never>>;
        return this;
    }

    sort() {
        const sortBy = (this?.query?.sort as string)?.split(',')?.join(" ") || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sortBy as string);
        return this;
    }

    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields(){
        const fields = (this?.query?.fields as string)?.split(",").join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    } 
}

export default QueryBuilder;