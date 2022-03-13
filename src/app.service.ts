import { Inject, Injectable } from '@nestjs/common';
import { Connection, EntityMetadata, Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    public connection: Connection
  ) { }

  async onModuleDestroy() {

    this.connection.entityMetadatas.forEach(
      async (item) => {
        let repository = this.connection.getRepository(item.name)
        await repository.manager.connection.close().catch(
          error => {
            return
          }
        )
      }
    )

  }

  getHello(): string {
    return 'Hello World!';
  }
}
