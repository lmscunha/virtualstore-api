"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mime = _interopRequireDefault(require("mime"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS,
      region: 'us-east-1'
    });
  }

  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file);

    const fileContent = await _fs.default.promises.readFile(originalPath);
    const fileTypes = /jpg|jpeg|png/;
    const filesChecker = fileTypes.test(_path.default.extname(file));

    const ContentType = _mime.default.getType(originalPath);

    if (!ContentType || !filesChecker) {
      await _fs.default.promises.unlink(originalPath);
      throw new _AppError.default('Formato de Arquivo inválido', 403);
    }

    await this.client.putObject({
      Bucket: _upload.default.config.disk.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _upload.default.config.disk.bucket,
      Key: file
    }).promise();
  }

}

var _default = DiskStorageProvider;
exports.default = _default;