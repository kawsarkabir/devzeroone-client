import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllUsers, makeAdmin, searchUsers } from '@/services/userService';
import { useDebounce } from '@/hooks/useDebounce';
import Swal from 'sweetalert2';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', debouncedSearchQuery],
    queryFn: () => debouncedSearchQuery ? searchUsers(debouncedSearchQuery) : getAllUsers()
  });

  const makeAdminMutation = useMutation({
    mutationFn: makeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire({
        title: 'Success!',
        text: 'User has been made admin successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to make user admin',
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const handleMakeAdmin = (userId: string, userName: string) => {
    Swal.fire({
      title: 'Make Admin?',
      text: `Are you sure you want to make ${userName} an admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0EA0E2',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, make admin',
      background: '#0F172A',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">Users Management</h1>
        <p className="text-muted-foreground">Manage all users and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {users.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? 'No users found matching your search' : 'No users found'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: any, index: number) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.image || '/placeholder.svg'}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      <User className="w-3 h-3 mr-1" />
                      {user.role}
                    </Badge>
                  </div>

                  {user.role !== 'admin' && (
                    <Button
                      onClick={() => handleMakeAdmin(user._id, user.name)}
                      className="w-full"
                      disabled={makeAdminMutation.isPending}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Make Admin
                    </Button>
                  )}

                  {user.role === 'admin' && (
                    <Button disabled className="w-full" variant="outline">
                      <Crown className="w-4 h-4 mr-2" />
                      Already Admin
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Users;