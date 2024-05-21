const uuid = require('uuid');
const path = require('path');
const { File } = require('../models/models');
const ApiError = require('../error/ApiError');

class FilesController {
	async create(req, res, next) {
		try {
			let { userId } = req.body;
			const { file } = req.files;
            const newFile = await File.create({
							userId,
							file: file.name,
							fileType: file.mimetype,
							data: file.data,
			});
			res.status(201).json({ message: 'File uploaded successfully', file: newFile });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

    async getAll(req, res) {
        try {
			const files = await File.findAll({where: { userId: req.user.userId },});
			res.json(files);
		} catch (error) {
		    res.status(400).json({ error: error.message });
		}
	}
}

module.exports = new FilesController();
