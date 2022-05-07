const fs = require('fs')
const path = require('path')
const qoa = require('qoa');//交互式命令行
const parse = require('swagger-parser')
const swaggerUrl = 'https://petstore.swagger.io/v2/swagger.json'
// api接口方法存放目录
const API_PATH = path.resolve(__dirname, './src/apitest')

// 判断目录是否存在
const isExist = (lastPath = '') => {
	const privatePath = `${lastPath ? API_PATH + '/' + lastPath : API_PATH}`
	//判断路径是否存在  存在true
  const stat = fs.existsSync(privatePath)
	if (!stat) {
		fs.mkdirSync(privatePath)
    console.log('创建目录'+privatePath+'成功');
	}else{
    console.log('已存在相同目录'+privatePath);
  }
	if (!lastPath) {
		const configPath = `${API_PATH}/config.js`
		// api 目录下写入 config文件
		fs.access(configPath, function (err) {
			if (err && err.code === 'ENOENT') {
				fs.writeFileSync(`${API_PATH}/config.js`, 'export const ip = \'https://test.××××.com/\'')
			}
		})
	}
}

// 整理出相同模块路径
const getModules = (map) => {
	map.forEach((value, key) => {
		writeFileApi(key, value)
	})
}

// 写入js
const writeFileApi = (fileName, apiData) => {
  console.log(fileName, apiData)
	// api.js
	let tplApi = 'import { ip } from \'../config\' \n\nexport default {\n'
	// index.js
	let tplIndex = 'import { post, get, put, delete } from \'../utils/request\'\nimport api from \'./api\'\n\n'

	const apiDataLen = apiData.length
	for (let i = 0; i < apiDataLen; i++) {
		const item = apiData[i]
		const itemKeys = Object.keys(item)	// 请求方法
		const itemTagKey = itemKeys[0]	// 方法数据信息
		const itemKeysFirest = item[itemTagKey]
		const pathName = itemKeysFirest.operationId
		const allPath = item.allPath
		tplApi = `${tplApi}   ${pathName}: \`\${ip}${allPath}\`,\n`
		tplIndex = `${tplIndex}\n//${itemKeysFirest.summary}\n` +
		`export const ${pathName} = (params) => {\n` +
		`	return ${itemTagKey}(api.${pathName}, params)\n}`
	}
	tplApi = tplApi + '\n}'
	fs.writeFileSync(`${API_PATH}/${fileName}/api.js`, tplApi)
	fs.writeFileSync(`${API_PATH}/${fileName}/index.js`, tplIndex)
}

// 入口方法
const apigen = async () => {
	isExist()
	try {
    // parsed 请求获取到的swagger json
		const parsed = await parse.parse(swaggerUrl)
		const paths = parsed.paths
		const pathsKeys = Object.keys(paths)	// 获取url路径

    
		const pathsKeysLen = pathsKeys.length
		const modulesMap = new Map()
		for (let i = 0; i < pathsKeysLen; i++) {
			const item = pathsKeys[i]
			const itemAry = item.split('/')
			const pathsItem = paths[item]
			let fileName = itemAry[3]
			if (!fileName) continue
			fileName = fileName.toLowerCase()
			// 创建模块目录
			isExist(fileName)
			// 完整路径
			pathsItem.allPath = item
			if (modulesMap.has(fileName)) {
				const fileNameAry = modulesMap.get(fileName)
				fileNameAry.push(pathsItem)
				modulesMap.set(fileName, fileNameAry)
			} else {
				modulesMap.set(fileName, [pathsItem])
			}
		}
    
		getModules(modulesMap)
	} catch (e) {
		console.log(e)
	}
}

apigen()

// const { generateApi } = require('swagger-typescript-api');
// const path = require("path");
// const fs = require("fs");

// /* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
// generateApi({
//   name: "MySuperbApi.ts",
//   output: path.resolve(process.cwd(), "./src/apitest"),
//   url: 'http://api.com/swagger.json',
//   input: path.resolve(process.cwd(), './foo/swagger.json'),
//   spec: {
//     swagger: "2.0",
//     info: {
//       version: "1.0.0",
//       title: "Swagger Petstore",
//     },
//     // ...
//   },
//   templates: path.resolve(process.cwd(), './api-templates'),
//   httpClientType: "axios", // or "fetch"
//   defaultResponseAsSuccess: false,
//   generateRouteTypes: false,
//   generateResponses: true,
//   toJS: false,
//   extractRequestParams: false,
//   extractRequestBody: false,
//   prettier: { // By default prettier config is load from your project
//     printWidth: 120,
//     tabWidth: 2,
//     trailingComma: "all",
//     parser: "typescript",
//   },
//   defaultResponseType: "void",
//   singleHttpClient: true,
//   cleanOutput: false,
//   enumNamesAsValues: false,
//   moduleNameFirstTag: false,
//   generateUnionEnums: false,
//   extraTemplates: [],
//   hooks: {
//     // onCreateComponent: (component) => {},
//     // onCreateRequestParams: (rawType) => {},
//     // onCreateRoute: (routeData) => {},
//     // onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
//     // onFormatRouteName: (routeInfo, templateRouteName) => {},
//     // onFormatTypeName: (typeName, rawTypeName) => {},
//     // onInit: (configuration) => {},
//     // onParseSchema: (originalSchema, parsedSchema) => {},
//     // onPrepareConfig: (currentConfiguration) => {},
//   }
// })
//   .then(({ files }) => {
//     files.forEach(({ content }) => {
//       fs.writeFile(path, content);
//     });
//   })
//   .catch(e => console.error(e))