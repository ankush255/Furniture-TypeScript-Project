import { Request } from 'express'; // Assuming you are using Express with multer

import multer, { StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'src/image');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, `Img-${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage: storage });
