all:    hello

run :
		cd server-api && npm run dev &
		cd webapp && npm run dev &
