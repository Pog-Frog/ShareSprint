import { createTransport } from "nodemailer"
import { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_PROVIDER, COMPANY_NAME, MAIL_TEMPLATE_LOCATION, URL, PORT } from "../config"
import { user_path } from "../routes/user.route"


const transporter = createTransport({
    service: MAIL_PROVIDER,
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
})

const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: MAIL_TEMPLATE_LOCATION,
        layoutsDir: MAIL_TEMPLATE_LOCATION,
        defaultLayout: 'verify-email.handlebars',
    },
    viewPath: MAIL_TEMPLATE_LOCATION,
    extName: '.handlebars',
}

transporter.use('compile', require('nodemailer-express-handlebars')(handlebarOptions))

export const sendEmail = async (to: string, subject: string, message: string, title: string, html: string) => {
    await transporter.sendMail({
        from: `"${COMPANY_NAME}" <${MAIL_USER}>`,
        to,
        subject,
        template: 'verify-email',
        context: {
            title,
            message,
            company: COMPANY_NAME
        }

    })
}

export const sendEmailVerification = async (name: string, to: string, token: string) => {
    await transporter.sendMail({
        from: `"${COMPANY_NAME}" <${MAIL_USER}>`,
        to,
        subject: 'Verify your email',
        template: 'verify-email',
        context: {
            title: `${COMPANY_NAME} - Verify your email`,
            message: `Hi ${name}, please click on the link below to verify your email address: ${URL}:${PORT}${user_path}/verify-email/${to}/${token}`,
            company: COMPANY_NAME
        }
    }).then((info) => {
        return info
    })
}