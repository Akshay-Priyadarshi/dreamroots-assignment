export class ApiResponse {
    constructor(
        public message: string,
        public statusCode: number = 200,
        public data?: any | null,
        public success?: boolean
    ) {
        this.message = message
        this.statusCode = statusCode
        this.data = data || null
        this.success = this.statusCode >= 200 && this.statusCode < 300
    }

    getJson = () => {
        return {
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
            success: this.success,
        }
    }
}
