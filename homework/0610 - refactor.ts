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
// 制程
// ============================================
type FileExt = 'txt' | 'exe' | 'doc' | 'other';
interface FileInfo  {
    name: string
    ext: FileExt
}
interface FileUploadRst {
    success: boolean
    msg?: string
}
type FileMapItem = {
    action: () => Promise<FileUploadRst>
}
// 要注意抽象出 upload 策略、规则
const FileExtMap: Record<FileExt, FileMapItem> = {
    txt: { action: async () => {} },
    exe: { action: async () => {} },
    doc: { action: async () => {} },
    other: { action: async () => ({ success: false, msg: 'error: ext worrg' }) },
}


// ============================================
// 生产
// ============================================
async function uploadFiles(fileNames: string[]): Promise<boolean[]> {
    return Promise.all(fileNames.map(i => new UploadFileManager(i)).map(i => i.upload()))
}
class UploadFileManager implements FileInfo {
    static FileExtMap = FileExtMap

    public name: string =  '';
    public ext!: FileExt;
    constructor (fileName: string) {
        this.name = fileName;
        this.ext = this.getExtName(fileName)
    }
    public async upload(): Promise<boolean> {
        const { success, msg } = await UploadFileManager.FileExtMap[this.ext].action() 
        !success && console.warn(msg)

        return success
    }
    private getExtName(fileName: string): FileExt {
        // todo
        return 'doc';
    }
}
