export class AppConfig {

    private static version: string;

    constructor(private version: string) {
        this.version = version;
    }

    public static setVersion(version: string) {
        this.version = version;
    }

    public static getCurrentVersion() {
        return this.version;
    }

}