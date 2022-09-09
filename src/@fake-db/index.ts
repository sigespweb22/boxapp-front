import mock from './mock'

import './cards'
import './table'
import './apps/chat'
import './pages/faq'
import './apps/email'
import './apps/calendar'
import './pages/pricing'
import './apps/permissions'
import './pages/knowledge-base'
import './server-side-menu/horizontal'

mock.onAny().passThrough()
