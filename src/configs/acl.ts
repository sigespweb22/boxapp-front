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

  role.forEach(item => {
    // ** begin - master
    if (item === 'Master') {
      can('manage', 'all')
      ///

      /// begin - dashboard all
    } else if (item === 'CanDashboardAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-dashboard-comercial-page')
      /// end - dashboard all

      /// begin user
    } else if (item === 'CanUserAll') {
      debugger
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-user-page')
    } else if (item === 'CanUserList') {
      can('list', 'ac-user-page')
    } else if (item === 'CanUserRead') {
      can('read', 'ac-user-page')
    } else if (item === 'CanUserUpdate') {
      can('update', 'ac-user-page')
    } else if (item === 'CanUserCreate') {
      can('create', 'ac-user-page')
    } else if (item === 'CanUserDelete') {
      can('delete', 'ac-user-page')
      // end user

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

      /// begin - cliente
    } else if (item === 'CanClienteAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-cliente-page')
    } else if (item === 'CanClienteList') {
      can('list', 'ac-cliente-page')
    } else if (item === 'CanClienteRead') {
      can('read', 'ac-cliente-page')
    } else if (item === 'CanClienteCreate') {
      can('create', 'ac-cliente-page')
    } else if (item === 'CanClienteUpdate') {
      can('update', 'ac-cliente-page')
    } else if (item === 'CanClienteDelete') {
      can('delete', 'ac-cliente-page')
      /// end - cliente

      /// begin - cnpj
    } else if (item === 'CanCnpjTPAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-search-cnpj')
    } else if (item === 'CanCnpjTPRead') {
      can('read', 'ac-search-cnpj')
      /// end - cnpj

      /// begin - cliente servico
    } else if (item === 'CanClienteServicoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-cliente-servico-page')
    } else if (item === 'CanClienteServicoList') {
      can('list', 'ac-cliente-servico-page')
    } else if (item === 'CanClienteServicoRead') {
      can('read', 'ac-cliente-servico-page')
    } else if (item === 'CanClienteServicoCreate') {
      can('create', 'ac-cliente-servico-page')
    } else if (item === 'CanClienteServicoUpdate') {
      can('update', 'ac-cliente-servico-page')
    } else if (item === 'CanClienteServicoDelete') {
      can('delete', 'ac-cliente-servico-page')
      /// end - cliente servico

      /// begin - serviço
    } else if (item === 'CanServicoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-servico-page')
    } else if (item === 'CanServicoList') {
      can('list', 'ac-servico-page')
    } else if (item === 'CanServicoRead') {
      can('read', 'ac-servico-page')
    } else if (item === 'CanServicoCreate') {
      can('create', 'ac-servico-page')
    } else if (item === 'CanServicoUpdate') {
      can('update', 'ac-servico-page')
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
    } else if (item === 'CanPipelineCreate') {
      can('create', 'ac-pipeline-page')
    } else if (item === 'CanPipelineUpdate') {
      can('update', 'ac-pipeline-page')
    } else if (item === 'CanPipelineDelete') {
      can('delete', 'ac-pipeline-page')
      /// end - pipeline

      /// begin - fornecedor
    } else if (item === 'CanFornecedorAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-fornecedor-page')
    } else if (item === 'CanFornecedorList') {
      can('list', 'ac-fornecedor-page')
    } else if (item === 'CanFornecedorRead') {
      can('read', 'ac-fornecedor-page')
    } else if (item === 'CanFornecedorUpdate') {
      can('update', 'ac-fornecedor-page')
    } else if (item === 'CanFornecedorCreate') {
      can('create', 'ac-fornecedor-page')
    } else if (item === 'CanFornecedorDelete') {
      can('delete', 'ac-fornecedor-page')
      /// end - fornecedor

      /// begin - fornecedor servico
    } else if (item === 'CanFornecedorServicoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-fornecedor-servico-page')
    } else if (item === 'CanFornecedorServicoList') {
      can('list', 'ac-fornecedor-servico-page')
    } else if (item === 'CanFornecedorServicoRead') {
      can('read', 'ac-fornecedor-servico-page')
    } else if (item === 'CanFornecedorServicoUpdate') {
      can('update', 'ac-fornecedor-servico-page')
    } else if (item === 'CanFornecedorServicoCreate') {
      can('create', 'ac-fornecedor-servico-page')
    } else if (item === 'CanFornecedorServicoDelete') {
      can('delete', 'ac-fornecedor-servico-page')
      /// end - fornecedor servico

      // begin - chave api
    } else if (item === 'CanChaveApiTerceiroAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-chave_api_terceiro-page')
    } else if (item === 'CanChaveApiTerceiroList') {
      can('list', 'ac-chave_api_terceiro-page')
    } else if (item === 'CanChaveApiTerceiroRead') {
      can('read', 'ac-chave_api_terceiro-page')
    } else if (item === 'CanChaveApiTerceiroUpdate') {
      can('update', 'ac-chave_api_terceiro-page')
    } else if (item === 'CanChaveApiTerceiroCreate') {
      can('create', 'ac-chave_api_terceiro-page')
    } else if (item === 'CanChaveApiTerceiroDelete') {
      can('delete', 'ac-chave_api_terceiro-page')
      /// end - chave api

      /// begin - dashboard comercial
    } else if (item === 'CanDashboardComercialAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-dashboard-comercial-page')
      /// end - dashboard comercial

      /// begin - cliente contrato
    } else if (item === 'CanClienteContratoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-cliente-contrato-page')
    } else if (item === 'CanClienteContratoList') {
      can('list', 'ac-cliente-contrato-page')
    } else if (item === 'CanClienteContratoRead') {
      can('read', 'ac-cliente-contrato-page')
    } else if (item === 'CanClienteContratoUpdate') {
      can('update', 'ac-cliente-contrato-page')
    } else if (item === 'CanClienteContratoCreate') {
      can('create', 'ac-cliente-contrato-page')
    } else if (item === 'CanClienteContratoDelete') {
      can('delete', 'ac-cliente-contrato-page')
      /// end - cliente contrato

      // begin - produto
    } else if (item === 'CanProdutoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-produto-page')
    } else if (item === 'CanProdutoList') {
      can('list', 'ac-produto-page')
    } else if (item === 'CanProdutoRead') {
      can('read', 'ac-produto-page')
    } else if (item === 'CanProdutoUpdate') {
      can('update', 'ac-produto-page')
    } else if (item === 'CanProdutoCreate') {
      can('create', 'ac-produto-page')
    } else if (item === 'CanProdutoDelete') {
      can('delete', 'ac-produto-page')
      /// end - produto

      // begin - produto
    } else if (item === 'CanProdutoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-produto-page')
    } else if (item === 'CanProdutoList') {
      can('list', 'ac-produto-page')
    } else if (item === 'CanProdutoRead') {
      can('read', 'ac-produto-page')
    } else if (item === 'CanProdutoUpdate') {
      can('update', 'ac-produto-page')
    } else if (item === 'CanProdutoCreate') {
      can('create', 'ac-produto-page')
    } else if (item === 'CanProdutoDelete') {
      can('delete', 'ac-produto-page')
      /// end - produto

      // begin - cliente produto
    } else if (item === 'CanClienteProdutoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-cliente-produto-page')
    } else if (item === 'CanClienteProdutoList') {
      can('list', 'ac-cliente-produto-page')
    } else if (item === 'CanClienteProdutoRead') {
      can('read', 'ac-cliente-produto-page')
    } else if (item === 'CanClienteProdutoUpdate') {
      can('update', 'ac-cliente-produto-page')
    } else if (item === 'CanClienteProdutoCreate') {
      can('create', 'ac-cliente-produto-page')
    } else if (item === 'CanClienteProdutoDelete') {
      can('delete', 'ac-cliente-produto-page')
      /// end - cliente produto

      // begin - fornecedor produto
    } else if (item === 'CanFornecedorProdutoAll') {
      can(['list', 'read', 'create', 'update', 'delete'], 'ac-fornecedor-produto-page')
    } else if (item === 'CanFornecedorProdutoList') {
      can('list', 'ac-fornecedor-produto-page')
    } else if (item === 'CanFornecedorProdutoRead') {
      can('read', 'ac-fornecedor-produto-page')
    } else if (item === 'CanFornecedorProdutoUpdate') {
      can('update', 'ac-fornecedor-produto-page')
    } else if (item === 'CanFornecedorProdutoCreate') {
      can('create', 'ac-fornecedor-produto-page')
    } else if (item === 'CanFornecedorProdutoDelete') {
      can('delete', 'ac-fornecedor-produto-page')
      /// end - forncedor produto
    } else {
      /// begin - dynamic subject
      can(['list', 'read', 'create', 'update', 'delete'], subject)
    }
    /// end - dynamic subject
  })

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
