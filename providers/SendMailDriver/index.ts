/*
 * @adonisjs/mail
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/// <reference path="../../node_modules/@adonisjs/mail/build/adonis-typings/mail.d.ts" />

import nodemailer from 'nodemailer'
import {
  MessageNode,
  SmtpMailResponse,
  SmtpDriverContract,
  SmtpConfig,
} from '@ioc:Adonis/Addons/Mail'

/**
 * Smtp driver to send email using smtp
 */

export type SendMailConfig = {
  driver: 'sendmail'
  auth: {
    path: string
  }
}

export class SendMailDriver implements SmtpDriverContract {
  private transporter: any

  constructor(config: SmtpConfig) {
    this.transporter = nodemailer.createTransport({ ...config, sendmail: true, newline: 'unix' })
  }

  /**
   * Send message
   */
  public async send(message: MessageNode): Promise<SmtpMailResponse> {
    if (!this.transporter) {
      throw new Error('Driver transport has been closed and cannot be used for sending emails')
    }

    return this.transporter.sendMail(message)
  }

  /**
   * Close transporter connection, helpful when using connections pool
   */
  public async close() {
    this.transporter.close()
    this.transporter = null
  }
}
