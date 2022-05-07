import {
  filterPaths,
} from '../../lib/utils/format';
import { changeFile } from '../../lib/utils';
import { getExtraDefinitions } from '../../lib/utils/format';
import buildService from '../../lib/Service';
import buildInterface from '../../lib/Interface';


const fs = require('fs');
const path = require('path');
const request = require('request')
const qoa = require('qoa');//交互式命令行

// api接口方法存放目录
// const API_PATH = path.resolve(__dirname, './src/apitest')

// swagger api-docs
const api = 'https://petstore.swagger.io/v2/swagger.json';
console.log(`try to request ${api}`);

const generatorService = (
  serviceDir: string,
  serviceSource: string,
  path: any,
  control: string
) => {
  const buildServiceInst = new buildService({
    controllerName: control,
    importTypePath: './type',
  });
  changeFile(
    serviceDir, 
    buildServiceInst.generator(serviceSource, path), () => {
      console.log(`成功文件${serviceDir}`)
    }
  );
}
const generatorInterface = (interDir: string, interSource: string, definitions: any) => {
  const buildInterfaceInst = new buildInterface();
  changeFile(
    interDir, 
    buildInterfaceInst.generator(interSource, getExtraDefinitions(definitions)),
    () => {
      console.log(`成功写入文件${interDir}`);
    }
  );
}
const cb = async (err: any, response: any) => {
  if (!err && response.statusCode === 200) { 
    console.log('success request!');
	//请求获取到的 swagger json 数据
    const { tags, paths, definitions } = JSON.parse(response.body);
	console.log(JSON.parse(response.body));
	
    const selectList = tags.filter((i: {name: string}) =>i.name !== '');
    const selectControl = {
      type: 'interactive',
      query: 'Select your api controller:',
      handle: 'control',
      symbol: '>',
      menu: selectList.map((i: {name: string}) =>i.name),
    };
    const { control } = await qoa.prompt([selectControl]);
    const p = filterPaths(control, paths);

    const serviceDir = path.join(`./${control}.ts`);
    fs.readFile(serviceDir, (err, serviceSource) => {
      if (err) {
        fs.writeFileSync(serviceDir, '')
      } 
      generatorService(serviceDir, serviceSource || '', p, control);
    });

    const interDir = path.join(`./type.ts`);
    fs.readFile(interDir, (err, interSource) => {
      if (err) {
        fs.writeFileSync(interDir, '');
      }
      generatorInterface(interDir, interSource || '', definitions);
    })
  }
}

request(api, cb);


