const path = require('path');
const fs = require('fs').promises;
const express = require('express');
const { createFile, getFiles, getFile } = require('./services/file.service');
const { handleError } = require('./utils/errors');
const { checkExtension } = require('./utils/utils');

const app = express();

const PORT = 8080;

app.use(express.json());

app.post('/api/files', async (req, res) => {
  try {
    const { filename, content } = req.body;
    checkExtension(filename);
    await createFile(filename, content)
    return res.status(200).json({ message: "File created successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Please specify 'content' parameter" });
  }
});

app.get('/api/files/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const filePath = path.join(__dirname, 'public', filename);
    const extension = path.extname(filename);

    const content = await getFile(filename);
    const uploadedDate = (await fs.stat(filePath)).ctime;

    return res.status(200).json({
      message: 'Success',
      filename,
      content,
      extension,
      uploadedDate
    })
  } catch(e) {
    return res.status(400).json({ message: `No file with '${filename}' filename found` });
  }
});


app.get('/api/files', async (req, res) => {
  try {
    const files = await getFiles();
    return res.status(200).json({
      message: 'Success',
      files
    });
  } catch(e) {
    return res.status(400).json({ message: 'Client error' });
  }
});

app.use(handleError);

app.listen(PORT, () => console.log(`Server was running on port ${PORT}...`));