import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActionNotificationComponent } from 'src/app/_models/_crud/alert/action-notification/action-notification.component';
import { AlertDialogComponent } from 'src/app/_models/_crud/alert/alert-dialog/alert-dialog.component';
import { DeleteEntityDialogComponent } from 'src/app/_models/_crud/alert/delete-entity-dialog/delete-entity-dialog.component';
import { FetchEntityDialogComponent } from 'src/app/_models/_crud/alert/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from 'src/app/_models/_crud/alert/update-status-dialog/update-status-dialog.component';
// Partials for CRUD


export enum MessageType {
  Create,
  Read,
  Update,
  Delete
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Service constructor
   *
   * @param snackBar: MatSnackBar
   * @param dialog: MatDialog
   */
  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  /**
   * Showing (Mat-Snackbar) Notification
   *
   * @param message: string
   * @param type: MessageType
   * @param duration: number
   * @param showCloseButton: boolean
   * @param showUndoButton: boolean
   * @param undoButtonDuration: number
   * @param verticalPosition: 'top' | 'bottom' = 'top'
   */
  showActionNotification(
    _message: string,
    _type: MessageType = MessageType.Create,
    _duration: number = 10000,
    _showCloseButton: boolean = true,
    _showUndoButton: boolean = true,
    _undoButtonDuration: number = 3000,
    _verticalPosition: 'top' | 'bottom' = 'bottom'
  ) {
    const _data = {
      message: _message,
      snackBar: this.snackBar,
      showCloseButton: _showCloseButton,
      showUndoButton: _showUndoButton,
      undoButtonDuration: _undoButtonDuration,
      verticalPosition: _verticalPosition,
      type: _type,
      action: 'Undo'
    };
    return this.snackBar.openFromComponent(ActionNotificationComponent, {
      duration: _duration,
      data: _data,
      verticalPosition: _verticalPosition
    });
  }

  /**
   * Showing Confirmation (Mat-Dialog) before Entity Removing
   *
   * @param title: stirng
   * @param description: stirng
   * @param waitDesciption: string
   */
  deleteElement(title: string = '', description: string = '', waitDesciption: string = '') {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: { title, description, waitDesciption },
      width: '440px'
    });
  }

  /**
   * Showing Confirmation (Mat-Dialog) before Entity Removing
   *
   * @param title: stirng
   * @param description: stirng
   * @param waitDesciption: string
   */
  alertElement(title: string = '', description: string = '', code: string = '') {

    return this.dialog.open(AlertDialogComponent, {
      data: { title, description, code },
      width: '440px'
    });
  }

  closeAlert() {
    this.dialog.closeAll();
  }
  /**
   * Showing Fetching Window(Mat-Dialog)
   *
   * @param _data: any
   */
  fetchElements(_data: any) {
    return this.dialog.open(FetchEntityDialogComponent, {
      data: _data,
      width: '400px'
    });
  }

  /**
   * Showing Update Status for Entites Window
   *
   * @param title: string
   * @param statuses: string[]
   * @param messages: string[]
   */
  updateStatusForEntities(title: any, statuses: any, messages: any) {
    return this.dialog.open(UpdateStatusDialogComponent, {
      data: { title, statuses, messages },
      width: '480px'
    });
  }
}
