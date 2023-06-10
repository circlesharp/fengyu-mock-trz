// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp (file: string): Promise<boolean> {
  return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
  cb(true)
}
function uploadByHttp (file: string): boolean {
  return true
}

// 实现如下
function upload (files: string[]): Promise<boolean> {
  return Promise.all(files.filter(file => {
      // 判断文件后缀
      const ext = file.match(/\.(\w+)$/)[1]
      if (ext !== 'txt' && ext !== 'ext' && ext !== 'doc') {
          return false
      }
      return true
  }).map(file => {
      // 根据后缀分别处理
      const ext = file.match(/\.(\w+)$/)[1]
      if (ext === 'txt') {
          return uploadByFtp(file)
      } else if (ext === 'exe') {
          return new Promise((resolve, reject) => {
              uploadBySftp([file], ret => {
                  if (ret) {
                      resolve(true)
                  } else {
                      reject()
                  }
              })
          })
      } else if (ext === 'doc') {
          return Promise.resolve(uploadByHttp(file))
      }
  })).then(() => {
      console.log('upload success.')
      return true
  })
}

// ============================================
// 服务器策略层
// ============================================
export type ServerType = 'ftp' | 'sftp' | 'http'
export type UploadRst = { success: boolean, msg?: string }
export type uploadFn = (fileName: string, cb?: (ret: boolean) => void) => Promise<UploadRst> 
export async function uploadFtp(fileName: string): Promise<UploadRst> {
    const success = await uploadByFtp(fileName)
    const msg = success ? undefined : 'uploadByFtp fail'
    return { success, msg }
}
export async function uploadSftp(fileName: string, cb: (ret: boolean) => void = (ret) => {}): Promise<UploadRst> {
    try {
        uploadBySftp([fileName], cb)
        return { success: true }
    } catch (error) {
        return { success: false, msg: 'uploadBySftp fail' }
    }
}
export async function uploadHttp(fileName: string): Promise<UploadRst> {
    try {
        uploadByHttp(fileName)
        return { success: true }
    } catch (error) {
        return { success: false, msg: 'uploadByHttp fail' }
    }
}

// ============================================
// 通用的 Upload 管理
// ============================================
export class UploadManager {
    public name: string =  '';
    public uploadFn?: (fileName: string) => Promise<UploadRst>;

    constructor (fileName: string, uploadFn?: (fileName: string) => Promise<UploadRst>) {
        this.name = fileName;
        if (uploadFn) {
            this.uploadFn = uploadFn
        }
    }
    public async upload(): Promise<boolean> {
        if (!this.uploadFn) throw new Error()
        
        const { success, msg } = await this.uploadFn(this.name)
        !success && console.warn(msg)

        return success
    }
    public setUploadFn(uploadFn: (fileName: string) => Promise<UploadRst>): void {
        this.uploadFn = uploadFn
    }
}

// ============================================
// 业务再封装
// ============================================

type FileExt = 'txt' | 'exe' | 'doc' | 'other';
const ExtServerMap: Record<FileExt, uploadFn> = {
    txt: uploadFtp,
    exe: uploadSftp,
    doc: uploadHttp,
    other: async () => ({ success: false, msg: 'not support' })
}
export class UploadByExtManager extends UploadManager {
    static ExtServerMap = ExtServerMap

    ext!: FileExt

    constructor(fileName: string) {
        super(fileName)
        this.ext = this.getExtByFileName(fileName)
        this.setUploadFn(UploadByExtManager.ExtServerMap[this.ext])
    }

    private getExtByFileName(fileName: string): FileExt {
        // todo
        return 'doc'
    }
}
export function uploadByExt(files: string[]): Promise<boolean[]> {
    const uploadManager = files.map(i => new UploadByExtManager(i))
    return Promise.all(uploadManager.map(i => i.upload()))
}
