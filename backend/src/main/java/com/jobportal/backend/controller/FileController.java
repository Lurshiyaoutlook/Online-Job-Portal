package com.jobportal.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:5178")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {

            String uploadDir = "uploads/";

            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            String filePath = uploadDir + file.getOriginalFilename();

            file.transferTo(new File(filePath));

            return ResponseEntity.ok(file.getOriginalFilename());

        } catch (IOException e) {

            return ResponseEntity.badRequest().body("Upload Failed");

        }

    }
}