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
  subject: string
  actions: string[]
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (abilities: Abilities[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  abilities.forEach(element => {

    const subject = element.subject
    const actions = element.actions

    can(actions, subject)
  })

  return rules
}

export const buildAbilityFor = (abilities: Abilities[]): AppAbility => {
  return new AppAbility(defineRulesFor(abilities), {
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
