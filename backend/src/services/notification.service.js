const Notification = require("../models/notification.model");
const { sendEmail } = require("./email.service");

const appointmentBookedTemplate = require("../templates/appointmentBooked.template");
const appointmentConfirmedTemplate = require("../templates/appointmentConfirmed.template");
const appointmentCancelledTemplate = require("../templates/appointmentCancelled.template");
const appointmentCancelledByClientTemplate = require("../templates/appointmentCancelledByClient.template")

const {
    formatAppointmentDate
} = require("../utils/dateFormatter");

const createAppointmentNotification = async ({
    appointment,
    professional,
    client
}) => {

    await Notification.create({
        userId: professional.userId,
        title: "New Appointment",
        message: `${client.username} booked an appointment on ${appointment.appointmentDate} at ${appointment.startTime}.`,
        type: "appointment_created",
        relatedAppointment: appointment._id
    });

    const html = appointmentBookedTemplate({
        professionalName: professional.userId.username,
        clientName: client.username,
        date: formatAppointmentDate(
            appointment.appointmentDate
        ),
        startTime: appointment.startTime,
        endTime: appointment.endTime
    });

    try {
        sendEmail({
            to: professional.userId.email,
            subject: "📅 New Appointment Booked",
            html
        });
    } catch (error) {
        console.error("Email sending failed:", error);
    }
}

const createAppointmentConfirmedNotification = async ({
    appointment,
    professional,
    client
}) => {

    await Notification.create({
        userId: client._id,
        title: "Appointment Confirmed",
        message:
            `Your appointment with ${professional.userId.username} has been confirmed.`,
        type: "appointment_confirmed",
        relatedAppointment: appointment._id
    });

    const html = appointmentConfirmedTemplate({
        clientName: client.username,
        professionalName:
            professional.userId.username,
        profession:
            professional.profession,
        date:
            formatAppointmentDate(
                appointment.appointmentDate
            ),
        startTime:
            appointment.startTime,
        endTime:
            appointment.endTime
    });

    sendEmail({
        to: client.email,
        subject:
            "✅ Your Appointment Has Been Confirmed",
        html
    }).catch(error => {

        console.error(error);
    
    });
}

const createAppointmentCancelledNotification = async ({
    appointment,
    professional,
    client
}) => {

    await Notification.create({
        userId: client._id,
        title: "Appointment Cancelled",
        message:
            `${professional.userId.username} cancelled your appointment.`,
        type: "appointment_cancelled",
        relatedAppointment: appointment._id
    });

    const html =
        appointmentCancelledTemplate({
            clientName:
                client.username,
            professionalName:
                professional.userId.username,
            profession:
                professional.profession,
            date:
                formatAppointmentDate(
                    appointment.appointmentDate
                ),
            startTime:
                appointment.startTime,
            endTime:
                appointment.endTime
        });

    sendEmail({
        to:
            client.email,
        subject:
            "Appointment Cancelled",
        html
    }).catch(error => {

        console.error(error);
    
    });

}

const createAppointmentCancelledByClientNotification = async ({
    appointment,
    professional,
    client
}) => {

    await Notification.create({
        userId: professional.userId._id,
        title: "Appointment Cancelled",
        message:
            `${client.username} cancelled the appointment.`,
        type: "appointment_cancelled",
        relatedAppointment: appointment._id
    });

    const html =
        appointmentCancelledByClientTemplate({
            professionalName:
                professional.userId.username,
            clientName:
                client.username,
            date:
                formatAppointmentDate(
                    appointment.appointmentDate
                ),
            startTime:
                appointment.startTime,
            endTime:
                appointment.endTime
        });

    sendEmail({
        to:
            professional.userId.email,
        subject:
            "🔴 Appointment Cancelled",
        html
    }).catch(error => {

        console.error(error);
    
    });
}


module.exports = {
    createAppointmentNotification,
    createAppointmentConfirmedNotification,
    createAppointmentCancelledNotification,
    createAppointmentCancelledByClientNotification
};