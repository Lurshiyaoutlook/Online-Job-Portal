package com.jobportal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendStatusEmail(String toEmail,
                                String applicantName,
                                String jobTitle,
                                String status) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Job Application Status");

        message.setText(
                "Hello " + applicantName + ",\n\n" +
                        "Your application for \"" + jobTitle + "\" has been " +
                        status + ".\n\n" +
                        "Thank you for using Job Portal.\n\n" +
                        "Regards,\nJob Portal Team"
        );

        mailSender.send(message);
    }
}