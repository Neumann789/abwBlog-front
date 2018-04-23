/*日志输出开关*/
export const CONFIG_LOG_SWITCH = 'ON' // ON 开启日志输出，OFF 关闭日志输出



export function log(message) {
  if(CONFIG_LOG_SWITCH === 'ON'){
    console.log(message)
  }
}

