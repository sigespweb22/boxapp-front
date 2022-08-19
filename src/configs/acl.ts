import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'list'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string[], subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  role.forEach((item) => {
    debugger;
    /// begin - master
    if (item === 'Master') {
      can('manage', 'all')
    /// end - master

    /// begin - users
    } else if (item === 'CanUserAll') {
      can(['create', 'read', 'update', 'delete'], 'ac-user-page')
    } else if (item === 'CanUserList') {
      can('list', 'ac-user-page')
    } else if (item === 'CanUserView') {
      can('read', 'ac-user-page')
    } else if (item === 'CanUserUpdate') {
      can('update', 'ac-user-page')
    } else if (item === 'CanUserCreate') {
      can('create', 'ac-user-page')
    } else if (item === 'CanUserDelete') {
      can('delete', 'ac-user-page')
    }
    /// end - users

    /// begin - dashboard cliente
    else if (item === 'CanDashboardClientRead') {
      can('read', 'dashboard-client-page')
    }
    /// end - dashboard cliente

  });

  return rules
}

export const buildAbilityFor = (role: string[], subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
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
