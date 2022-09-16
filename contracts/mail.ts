/**
 * Contract source: https://git.io/JvgAT
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { InferMailersFromConfig } from '@adonisjs/mail/build/config'
import mailConfig from '../config/mail'
import { SendMailConfig } from 'providers/SendMailDriver'

declare module '@ioc:Adonis/Addons/Mail' {
  interface MailersList extends InferMailersFromConfig<typeof mailConfig> {}

  interface MailDrivers {
    sendmail: {
      config: SendMailConfig
      implementation: MailDriverContract
    }
  }
}
