class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates that this error is expected and handled
    // Optional: You can add additional properties or methods if needed
  Error.captureStackTrace(this, this.constructor); // isse limited information milegi bahut sara data nahi aayega 
  }
}

export const errorHandler = ErrorHandler;
