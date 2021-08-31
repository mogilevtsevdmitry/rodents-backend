import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'aurora-data-api',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dropSchema: false,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      definitions: {
        emitTypenameField: true,
      },
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
