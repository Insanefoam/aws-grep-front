echo "Download swagger schema:"
curl "http://localhost:3001/api-json" -o swagger.json
echo "Generate types"
npx @manifoldco/swagger-to-ts swagger.json --output ./src/types/global-types.ts