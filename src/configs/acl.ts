import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'list' | 'read' | 'create' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

interface Abilities {
  abilities:string[],
  subject:string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (roles: Abilities[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  
  roles.forEach(element => {
    debugger
    // can(['list', 'read', 'create', 'update', 'delete'], 'ac-dashboard-comercial-page')
    if (element.subject === "all") {
      can(element.abilities.toString(), element.subject)
    }
      
    can(element.abilities, element.subject)
    debugger
  })

  return rules
}

export const buildAbilityFor = (roles: Abilities[], subject: string): AppAbility => {
  const newRoles = [
    { abilities: ['list', 'read', 'create', 'update', 'delete'], subject: 'ac-dashboard-comercial-page' },
    { abilities: ['list', 'update'], subject: 'ac-cliente-page' },
    { abilities: ['list'], subject: 'ac-cliente-contrato-page' },
    { abilities: ['list'], subject: 'section-title-system' }
  ]

  // const newRoles = [
  //   { abilities: ['manage'], subject: 'all' },
  // ]

  return new AppAbility(defineRulesFor(newRoles), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
