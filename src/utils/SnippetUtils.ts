class SnippetUtils {

    public static uppercaseFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static sleep(ms: number): Promise<NodeJS.Timeout> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export default SnippetUtils;
