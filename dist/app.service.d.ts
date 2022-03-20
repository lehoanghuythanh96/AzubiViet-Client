import { Connection } from 'typeorm';
export declare class AppService {
    connection: Connection;
    constructor(connection: Connection);
    onModuleDestroy(): Promise<void>;
    getHello(): string;
}
