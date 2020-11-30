/*
 * subtable view toggle
 * Copyright (c) 2020 Naoki Asayama
 *
 * Licensed under the MIT License
 */
jQuery.noConflict();
(function ($) {
  'use strict'
  let pc_events = [
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show'
  ]

  let sp_events = [
    'mobile.app.record.detail.show',
    'mobile.app.record.create.show',
    'mobile.app.record.edit.show'
  ]

  kintone.events.on(pc_events, (event) => {
    addDOMCollapesSubtableHeader()

    jQuery('.subtable-gaia > tbody').hide()

    jQuery('.subtable-gaia th.table-toggle').on('click', function () {
      if (0 === document.getElementsByClassName('row-column').length) {
        addNumberingSubtableBody()
      }
      jQuery(this).parents('thead').next().toggle()
      jQuery(this).parents('tr').toggleClass('control-group-gaia-collapsed')
    })

    jQuery(document).on('click', 'button.add-row-image-gaia', function () {
      let target = jQuery(this).parents('tr').next()
      let targetRClen = target.children('.row-column').length

      if (0 === targetRClen) {
        jQuery(target).prepend('<td class="row-column"><div class="control-gaia"><div class="control-value-gaia row-cell"></div></div></td>')
      }
    })

    tableToggleForPC(event)

  })

  kintone.events.on(sp_events, (event) => {
    // iOS端末でz-indexがおかしくなる部分のfix
    document.head.insertAdjacentHTML('beforeend','<style>.forms-editor-inner-gaia, .forms-textarea-gaia {-webkit-transform: none;}</style>')
    // iOS SEの端末でテーブル開閉のタブが見えにくいため、対応
    document.head.insertAdjacentHTML('beforeend', '<style>@media (max-width: 320px).goog-tab { padding: 12px 6px 10px 6px; } </style>')

    setSubtableToggleOnLabel()

    tableToggleForMobile()
  })

  /**
   * for PC
   * @return void
   */
  const addDOMCollapesSubtableHeader = () => {
    jQuery('.subtable-gaia > thead.subtable-header-gaia').each(function (i) {
      jQuery(this).find('tr').each(function (row) {
        if (row === 0) {
          jQuery(this).addClass('control-group-gaia-collapsed')
          jQuery(this).prepend('<th class="table-toggle subtable-label-gaia group-label-gaia"><span><span></th>')
          jQuery('th.table-toggle').css('margin', '0')
        }
      })
    })
  }

  /**
   * for PC
   * @return void
   */
  const addNumberingSubtableBody = () => {
    jQuery('.subtable-gaia tbody').each(function (i) {
      jQuery(this).find('tr').each(function (row) {
        jQuery(this).prepend('<td class="row-column"><div class="control-gaia"><div class="control-value-gaia row-cell"></div></div></td>')
      })
      jQuery(this).find('td.reference_table-message-gaia').each(function (row) {
        jQuery(this).parents('tbody')
          .prepend('<td class="row-column"><div class="control-gaia"><div class="control-value-gaia row-cell"></div></div></td>')
      })
    })
  }

  /**
   * for PC
   * トグルボタンのDOM生成、イベント登録
   * @param event event
   * @return void
   */
  const tableToggleForPC = (event) => {
    // 複数生成されてしまうのを回避
    if (document.querySelector('#table-toggle')) return

    const toggle = () => {
      // 開閉ボタンクリック時の処理をイベント登録する
      document.querySelector('button#table-toggle').addEventListener('click', () => {
        let tableToggleList = document.querySelectorAll('span.group-label-gaia')
        let subTableToggleList = document.querySelectorAll('.subtable-gaia th.table-toggle')

        tableToggleList.forEach((elem) => {
          elem.click()
        })
        subTableToggleList.forEach((elem) => {
          elem.click()
        })
      })
    }

    // createはボタンが存在しないため、描画方法を変更する
    if (event.type === 'app.record.create.show') {
      const toggleButtonNodeforCreatePage =
        '<button type="button" id="table-toggle" class="gaia-ui-actionmenu-cancel" ' +
        'style="user-select: none; margin-left: 16px;">テーブル開閉</button>'

      jQuery('#appForm-gaia > div > button.gaia-ui-actionmenu-save').after(toggleButtonNodeforCreatePage)

      toggle()

    } else {
      const svgIconMinusQueare = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-square"' +
        ' style="width: 32px; height: 32px; color: white; vertical-align: bottom;" class="svg-inline--fa fa-minus-square fa-w-14" role="img"' +
        ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
        '<path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"></path></svg>'

      const toggleButtonNode =
        '<button class="goog-tab" title="テーブル開閉" role="tab" aria-selected="false" id="table-toggle" ' +
        'style="position: fixed; bottom: 0; width: 48px; height: 48px; border:none; background: #9F9F9F;">' +
        svgIconMinusQueare +
        '</button>'

      jQuery('.goog-tab-bar .goog-tab:last').after(toggleButtonNode)

      toggle()
    }

  }

  /**
   * for mobile
   * .subtable-label-gaia に開閉トグル機能を付与する
   * @return void
   */
  const setSubtableToggleOnLabel = () => {

    let subtableLabelGaia = jQuery('.subtable-label-gaia')

    jQuery('.subtable-row-gaia').hide()
    subtableLabelGaia.css({
      'text-decoration-line': 'underline',
      'font-size': 'medium'
    })

    subtableLabelGaia.on('click', function () {
      jQuery(this).parent().find('div.subtable-row-gaia').toggle()
    })
  }

  /**
   * for mobile
   * トグルボタンのDOM生成、イベント登録
   * @return void
   */
  const tableToggleForMobile = () => {
    // 複数生成されるのを回避する
    if (document.querySelector('#table-toggle')) return

    const toggleButtonNode =
      '<div class="gaia-mobile-v2-app-record-subtable-toggle goog-tab" role="tab" title="テーブル開閉" aria-selected="false" id="table-toggle">テーブル開閉</div>'

    jQuery('div.goog-tab-bar .goog-tab:last').after(toggleButtonNode)

    document.querySelector('div#table-toggle').addEventListener('click', (e) => {
      let tableToggleList = document.querySelectorAll('button.control-group-label')
      let subTableToggleList = document.querySelectorAll('.subtable-label-gaia')

      tableToggleList.forEach((elem) => {
        elem.click()
      })
      subTableToggleList.forEach((elem) => {
        elem.click()
      })
    })
  }

})()