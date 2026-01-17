from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: Only owners can edit their forms,
    but anyone can view them.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS = GET, HEAD, OPTIONS → allow read-only access
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions only for the owner
        return obj.owner == request.user
