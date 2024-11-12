
#Development

Steps to start app in dev

1. Start db
```
docker compose up -d
```

2. Create a copy of .env.template and rename it to .env
3. Replace env variables
4. Run command ``` npm install ```
5. Run command ``` npm run dev ```
6. Generate Database:
```
npx prisma migrate dev
npx prisma generate

```
7. Execute SEED to create DB (localhost:3000/api/seed)


# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

# Prod

# Stage