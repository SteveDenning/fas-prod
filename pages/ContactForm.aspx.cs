using System;
using System.Collections.Generic;

public partial class ContactForm : System.Web.UI.Page
{
    // **********************************************************
    
    // Change values here

    private const string MailServer = "in.mailjet.com";
    private const string MailSubject = "Remapping Enquiry (Website)";
    private const string FromAddress = "webstance@gmail.com";
    private const string ToAddress = "steve.denning@hotmail.co.uk"; // mpg-remapping@sky.com 
    private const int MailServerPort = 587;
    private const int MailServerTimeoutMilliseconds = 10000;
    private const string MailServerUsername = "5ca3768f4b2cdc740dafd78ff11c32dd";
    private const string MailServerPassword = "a6fce0bb0177bb3a11b786a335d578d4";
    private const string RedirectUrl = "thanks.html";
    private const string RequiredFormValueIds = "First_name,Last_name,Phone_number,Email,Message"; // comma delimited
    private const string BlindCopyRecipient = "steve.denning@hotmail.co.uk";
    
    // **********************************************************

    protected void Page_Load(object sender, EventArgs e)
    {
        List<string> requiredFormIdList = new List<string>(RequiredFormValueIds.Split(',')); 

        if (Request.Form.Count <= 0)
        {
            return;
        }
        
        string body = "";
        
        foreach (string key in Request.Form.AllKeys)
        {
            if (requiredFormIdList.Contains(key))
            {
                body += key.Replace('_', ' ') + ": " + Request.Form[key];
                body += Environment.NewLine + Environment.NewLine;
            }
        }

        body += "IP Address: " + Request.ServerVariables["REMOTE_ADDR"];
//
        var smtpSender = new System.Net.Mail.SmtpClient
            {
                Timeout = MailServerTimeoutMilliseconds,
                Port = MailServerPort,
                Host = MailServer,
                Credentials = new System.Net.NetworkCredential(MailServerUsername, MailServerPassword)
            };
//
        var msg = new System.Net.Mail.MailMessage
            {
                Body = body,
                From = new System.Net.Mail.MailAddress(FromAddress) 
            };
        
        msg.To.Add(new System.Net.Mail.MailAddress(ToAddress));
        msg.Bcc.Add(new System.Net.Mail.MailAddress(BlindCopyRecipient));
        
        msg.Priority = System.Net.Mail.MailPriority.Normal;
        msg.Subject = MailSubject;
        smtpSender.Send(msg);
        
        Response.Redirect(RedirectUrl);
    }
}