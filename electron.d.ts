declare global {
    interface Window {
      electron: {
        openFile: (filePath: string) => Promise<void>;
      };
    }
  }
  
  export {};