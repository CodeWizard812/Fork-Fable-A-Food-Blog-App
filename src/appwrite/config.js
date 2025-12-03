import conf from '../conf/conf.js';
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

// This class is a service that handles all interactions with Appwrite's database and storage.
export class Service{
    client = new Client();
    tablesDB;
    bucket;
    
    constructor(){
        // Initialize the Appwrite client with your project URL and ID
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        // Initialize the TablesDB service for database operations
        this.tablesDB = new TablesDB(this.client);
        
        // Initialize the Storage service for file uploads and downloads
        this.bucket = new Storage(this.client);
    }

    // Creates a new post (a new row in the database table)
    async createPost({title, slug, content, featuredImage, status, userId, userName}){
        try {
            // New syntax: pass parameters as a single object
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId, // Note: This is now called 'tableId'
                rowId: slug, // Unique ID for the new row
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //here slug is not being updated.
    // Updates an existing post by its slug (row ID)
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            // New syntax: pass parameters as a single object
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Deletes a post (a row) from the database
    async deletePost(slug){
        try {
            // New syntax: pass parameters as a single object
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Retrieves a single post by its slug (row ID)
    async getPost(slug){
        try {
            // New syntax: pass parameters as a single object
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Fetches a list of posts with optional queries
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            // New syntax: pass parameters as a single object
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: queries,
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // --- File Upload and Retrieval Service ---

    // Uploads a file to Appwrite storage
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(), // Generates a unique ID for the file
                file: file,
            } 
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Deletes a file from Appwrite storage
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Gets a preview URL for a file
    getFilePreview(fileId){
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
        });
    }
}


const service = new Service();
export default service;