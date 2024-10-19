// models/Notification.js

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["INFO", "SUCCESS", "WARNING", "ERROR"],
      default: "INFO",
    },
    relatedTo: {
      type: String,
      enum: ["APPLICATION", "INTERVIEW", "PROFILE", "SYSTEM"],
      default: "SYSTEM",
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedTo",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    actionRequired: {
      type: Boolean,
      default: false,
    },
    actionLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
NotificationSchema.index({ userId: 1, createdAt: -1 });

// Method to mark notification as read
NotificationSchema.methods.markAsRead = function () {
  this.isRead = true;
  return this.save();
};

// Static method to create a new notification
NotificationSchema.statics.createNotification = async function (data) {
  return this.create(data);
};

// Static method to get unread notifications for a user
NotificationSchema.statics.getUnreadNotifications = function (userId) {
  return this.find({ userId, isRead: false }).sort({ createdAt: -1 });
};

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
