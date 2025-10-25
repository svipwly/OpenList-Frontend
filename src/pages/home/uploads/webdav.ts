import { createClient } from "webdav";
import { Upload } from "./types";

export const WebDAVUpload: Upload = async (
  uploadPath: string,
  file: File,
  setUpload,
  asTask = false,
  overwrite = false,
  rapid = false,
): Promise<Error | undefined> => {
  try {
    // WebDAV 客户端配置
    const client = createClient("https://example-webdav-server.com", {
      username: "your-username",
      password: "your-password",
    });

    const remotePath = `/remote-path/${file.name}`;
    const fileStream = file.stream();

    // 上传文件
    await client.putFileContents(remotePath, fileStream, { overwrite });

    // 更新状态
    setUpload("status", "success");
    return undefined;
  } catch (error) {
    setUpload("status", "error");
    setUpload("msg", error.message);
    return error;
  }
};
