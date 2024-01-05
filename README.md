# Notes

- ⚠️ CreateSignal updates for shallow data struct (strings, numbers...) but not for deep data struct (object, array...)
- ⚠️ No deconstruction of props at component parameters level ( break fined grained updates )
- Signal value is a function (call it) ex : state()
- No virtual dom => no diffing => no reconciliation => no key
- onInput fires on every keystroke, onChange fires on blur
