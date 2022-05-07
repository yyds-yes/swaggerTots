// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateApi } = require('@wynnyo/swagger-typescript-api')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const path = require('path')
const outputDir = path.resolve(process.cwd(), './example/src/apitest');
generateApi({
	output: outputDir, // 输出的文件放在哪个目录下
	modular: true,
	url: 'https://petstore.swagger.io/v2/swagger.json', // swaggerjson地址
	templates: './templates/default', // 编译模板地址
})
	.then(({ files }) => {
		files.forEach(({ content, name }) => {
			// eslint-disable-next-line no-undef
			fs.writeFile(`.\\src\\api\\${name}`, content, err => {
				console.log(err)
			})
		})
	})
	.catch(e => console.error(e))

