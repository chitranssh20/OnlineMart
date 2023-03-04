from django.urls import path 
from .views import savePromoCode, getPromoCode, updateCode, deleteCode, saveComment, deleteComment, getComment, getReply
urlpatterns = [
    path('savePromoCode/', savePromoCode.as_view(), name='savePromoCode'),
    path('getPromoCode/', getPromoCode.as_view(), name='getPromoCode'),
    path('updateCode/<int:id>', updateCode.as_view(), name='updateCode'),
    path('deleteCode/<int:id>', deleteCode.as_view(), name='deleteCode'),
    path('saveComment/', saveComment.as_view(), name='saveComment'),
    path('deleteComment/<int:id>', deleteComment.as_view(), name='deleteComment'),
    path('getComment/<int:id>', getComment.as_view(), name='getComment'),
    path('getReply/<int:id>', getReply.as_view(), name='getReply'),
]
