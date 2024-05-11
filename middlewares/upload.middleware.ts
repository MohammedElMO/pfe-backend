import { UploadClient } from "@uploadcare/upload-client/node"
import asyncHandler from "express-async-handler"

import { UploadcareAuthSchema } from "@uploadcare/rest-client"
import { arrayBuffer, buffer } from "stream/consumers"

const uploadcareAuthSchema = new UploadcareAuthSchema({
  publicKey: "Yc520168d21387766a94a",
  secretKey: "6d7e3f2e42653efb1731",
})

export const uploadAvatar = asyncHandler(async (req, res) => {
  // const client = new UploadClient(uploadcareAuthSchema)

  const b =  await buffer(req.body)
  console.log(b)
  res.send("ol")
})
