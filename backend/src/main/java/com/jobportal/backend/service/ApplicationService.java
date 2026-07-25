package com.jobportal.backend.service;

import com.jobportal.backend.entity.Application;
import com.jobportal.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.jobportal.backend.entity.Job;
import com.jobportal.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private EmailService emailService;

    public Application applyJob(
            String applicantName,
            String applicantEmail,
            Long jobId,
            MultipartFile resume
    ) throws Exception {

        Job job = jobRepository.findById(jobId).orElseThrow();

        String fileName = UUID.randomUUID() + "_" + resume.getOriginalFilename();

        File folder = new File(uploadDir);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        File destination = new File(folder, fileName);

        resume.transferTo(destination.getAbsoluteFile());

        Application application = new Application();

        application.setApplicantName(applicantName);
        application.setApplicantEmail(applicantEmail);
        application.setResume(fileName);
        application.setStatus("Pending");
        application.setJob(job);

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application updateStatus(Long id, String status) {

        Application application = applicationRepository.findById(id).orElseThrow();

        application.setStatus(status);

        Application updatedApplication = applicationRepository.save(application);

        emailService.sendStatusEmail(
                application.getApplicantEmail(),
                application.getApplicantName(),
                application.getJob().getTitle(),
                status
        );

        return updatedApplication;
    }
}