const appointmentBookedTemplate = ({
    professionalName,
    clientName,
    date,
    startTime,
    endTime,
    appointmentUrl = "#"
}) => {

    return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Appointment</title>
</head>

<body style="
    margin:0;
    padding:24px 16px;
    background:#F5F5F5;
    font-family:Arial,Helvetica,sans-serif;
">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="
        max-width:560px;
        margin:auto;
        background:#ffffff;
        border:1px solid #E5E5E5;
        border-radius:12px;
    "
>

<tr>

<td style="padding:36px 36px 20px;">

<img
    src="https://ik.imagekit.io/pranavbirla/ApointLogo.png"
    alt="Apoint"
    width="58"
    style="display:block;margin-bottom:20px;"
>

<h1 style="
    margin:0;
    font-size:28px;
    color:#111111;
    font-weight:700;
">
New appointment booked
</h1>

<p style="
    margin:18px 0 0;
    font-size:15px;
    color:#555555;
    line-height:1.7;
">

Hello <strong>${professionalName}</strong>,

<br><br>

A new appointment has been booked through Apoint.

Please review the details below.

</p>

</td>

</tr>

<tr>

<td style="padding:0 36px;">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border:1px solid #E7E7E7;
border-radius:10px;
"
>

<tr>

<td style="padding:14px 18px;color:#777;font-size:14px;">
Client
</td>

<td align="right" style="padding:14px 18px;font-size:14px;font-weight:600;color:#111;">
${clientName}
</td>

</tr>

<tr>

<td style="padding:14px 18px;color:#777;font-size:14px;border-top:1px solid #EFEFEF;">
Date
</td>

<td align="right" style="padding:14px 18px;font-size:14px;font-weight:600;color:#111;border-top:1px solid #EFEFEF;">
${date}
</td>

</tr>

<tr>

<td style="padding:14px 18px;color:#777;font-size:14px;border-top:1px solid #EFEFEF;">
Time
</td>

<td align="right" style="padding:14px 18px;font-size:14px;font-weight:600;color:#111;border-top:1px solid #EFEFEF;">
${startTime} - ${endTime}
</td>

</tr>

</table>

</td>

</tr>

<tr>

<td align="center" style="padding:30px 36px;">

<a
href="${appointmentUrl}"
style="
display:inline-block;
background:#111111;
color:#FFFFFF;
padding:14px 28px;
border-radius:999px;
text-decoration:none;
font-size:14px;
font-weight:600;
">
View Appointment
</a>

</td>

</tr>

<tr>

<td style="
padding:0 36px 32px;
">

<hr style="
border:none;
border-top:1px solid #ECECEC;
margin:0 0 18px;
">

<p style="
margin:0;
font-size:13px;
line-height:1.7;
color:#777777;
">

This email was sent because a client booked an appointment through your Apoint account.

If you weren't expecting this notification, please contact support.

</p>

</td>

</tr>

</table>

</body>

</html>
`;

};

module.exports = appointmentBookedTemplate;