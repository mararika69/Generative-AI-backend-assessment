import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { UserInfo } from "../entity/user.entity";
import { Certificate } from "../entity/certificate.entity";

export const createCertificate = async (req: Request, res: Response) => {
    const { courseName } = req.body;

    if (!courseName) {
        return res.status(400).json({ message: "Course name is required" });
    }

    const certificateRepo = AppDataSource.getRepository(Certificate);
    const userRepo = AppDataSource.getRepository(UserInfo);
    const user = await UserInfo.findOne({ where: { id: req.user?.id } });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const certificate = new Certificate();
    certificate.courseName = courseName;
    certificate.user = user.id; 

    try {
        await certificateRepo.save(certificate); 
        return res.status(201).json({ message: "Certificate created successfully", certificate });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error instanceof Error? error.message : "Unknown error" });
    }
}
