import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'list' | 'read' | 'create' | 'update' | 'delete' 

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
    /// begin - master
    if (item === 'Master') {
      can('manage', 'all')
    /// end - master

    /// begin - user
    } else if (item === 'CanUserAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-user-page')
    } else if (item === 'CanUserList') {
      can('list', 'ac-user-page')
    } else if (item === 'CanUserRead') {
      can('read', 'ac-user-page')
    } else if (item === 'CanUserUpdate' || item === 'CanUserAlterStatus') {
      can('update', 'ac-user-page')
    } else if (item === 'CanUserCreate') {
      can('create', 'ac-user-page')
    } else if (item === 'CanUserDelete') {
      can('delete', 'ac-user-page')
    /// end - user
    
    /// begin - role/permissions
    } else if (item === 'CanRoleAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-role-page')
    } else if (item === 'CanRoleList') {
      can('list', 'ac-role-page')
    } else if (item === 'CanRoleRead') {
      can('read', 'ac-role-page')
    } else if (item === 'CanRoleUpdate') {
      can('update', 'ac-role-page')
    } else if (item === 'CanRoleCreate') {
      can('create', 'ac-role-page')
    } else if (item === 'CanRoleDelete') {
      can('delete', 'ac-role-page')
    /// end - role/permissions

    /// begin - grupo
    } else if (item === 'CanGroupAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-grupo-page')
    } else if (item === 'CanGroupList') {
      can('list', 'ac-grupo-page')
    } else if (item === 'CanGroupRead') {
      can('read', 'ac-grupo-page')
    } else if (item === 'CanGroupUpdate') {
      can('update', 'ac-grupo-page')
    } else if (item === 'CanGroupCreate') {
      can('create', 'ac-grupo-page')
    } else if (item === 'CanGroupDelete') {
      can('delete', 'ac-grupo-page')
    /// end - grupo

    /// begin - cnpj
    } else if (item === 'CanCnpjTPAll') {
      can(['list', 'read'], 'ac-search-cnpj')
    } else if (item === 'CanCnpjTPListOne') {
      can('read', 'ac-search-cnpj')
    /// end - cnpj

    /// begin - cliente
    } else if (item === 'CanClientAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-cliente-page')
    } else if (item === 'CanClientList') {
      can('list', 'ac-cliente-page')
    } else if (item === 'CanClientRead') {
      can('read', 'ac-cliente-page')
    } else if (item === 'CanClientUpdate') {
      can('update', 'ac-cliente-page')
    } else if (item === 'CanClientCreate') {
      can('create', 'ac-cliente-page')
    } else if (item === 'CanClientDelete') {
      can('delete', 'ac-cliente-page')
    /// end - cliente

    /// begin - serviço
    } else if (item === 'CanServicoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-servico-page')
    } else if (item === 'CanServicoList') {
      can('list', 'ac-servico-page')
    } else if (item === 'CanServicoRead') {
      can('read', 'ac-servico-page')
    } else if (item === 'CanServicoUpdate') {
      can('update', 'ac-servico-page')
    } else if (item === 'CanServicoCreate') {
      can('create', 'ac-servico-page')
    } else if (item === 'CanServicoDelete') {
      can('delete', 'ac-servico-page')
    /// end - Servico

    /// begin - pipeline
  } else if (item === 'CanPipelineAll') {
    can(['list', 'read', 'create', 'update', 'delete'], 'ac-pipeline-page')
  } else if (item === 'CanPipelineList') {
    can('list', 'ac-pipeline-page')
  } else if (item === 'CanPipelineRead') {
    can('read', 'ac-pipeline-page')
  } else if (item === 'CanPipelineUpdate') {
    can('update', 'ac-pipeline-page')
  } else if (item === 'CanPipelineCreate') {
    can('create', 'ac-pipeline-page')
  } else if (item === 'CanPipelineDelete') {
    can('delete', 'ac-pipeline-page')
  /// end - pipeline

    /// begin - dashboard all
    } else if (item === 'CanDashboardAll') {
      can('list', 'ac-dashboard-cliente-page')
      can('list', 'ac-dashboard-controle_acesso-page')
    /// end - dashboard client

    /// begin - dashboard client
    } else if (item === 'CanDashboardClientList') {
      can('list', 'ac-dashboard-client-page')
    /// end - dashboard client

    /// begin - dashboard client
    } else if (item === 'CanDashboardACList') {
      can('list', 'ac-dashboard-access-control-page')
    } else {
      can(['list', 'read', 'create', 'update', 'delete'], subject)
    }
    /// end - dashboard client'

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
