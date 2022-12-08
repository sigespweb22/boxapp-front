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
  abilities: string,
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (rolesClaims: Abilities[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  debugger
  
  rolesClaims.forEach(element => {
    // can(['list', 'read', 'create', 'update', 'delete'], 'ac-dashboard-comercial-page')
    if (element.subject === "all") {
      debugger
      can(element.abilities, element.subject)
    }
      
    can(element.abilities, element.subject)
  })

  return rules
}

export const buildAbilityFor = (rolesClaims: Abilities[], subject: string): AppAbility => {
  debugger
  const newRolesClaims = [
    { abilities: 'list', subject: 'ac-dashboard-comercial-page' },
    { abilities: 'list', subject: 'ac-cliente-page' },
    { abilities: 'update', subject: 'ac-cliente-page' },
    { abilities: 'list', subject: 'ac-cliente-contrato-page' },
    { abilities: 'list', subject: 'section-title-system' }
  ]

  // const rolesClaims = [
  //   { abilities: ['manage'], subject: 'all' },
  // ]

  return new AppAbility(defineRulesFor(newRolesClaims), {
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
